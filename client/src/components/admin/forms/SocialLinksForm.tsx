import axios from "axios";
import { useState, useEffect } from "react";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";
import { socialLinksProps } from "../../../types/UserProps";

export const SocialLinksForm = ({ hideForm }: { hideForm: () => void }) => {
  const { _id, accessToken } = useAppSelector(getUser);

  const [socialLinks, setSocialLinks] = useState<socialLinksProps>({
    google: "",
    youtube: "",
    twitter: "",
    telegram: "",
    instagram: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_VERSION!}/users/${_id}`
        );
        const links = res.data.socialLinks || [];
        console.log(links);
        const updatedLinks = Object.fromEntries(
          links.map((link: { name: string; value: string }) => [
            link.name,
            link.value,
          ])
        ) as socialLinksProps;

        setSocialLinks(updatedLinks);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching links!");
      }
    };
    fetchLinks();
  }, [_id]);

  const handleSocialLinksSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_VERSION!}/users`,
        {
          socialLinks: Object.entries(socialLinks).map(([name, value]) => ({
            name,
            value,
          })),
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      hideForm();
    } catch (err) {
      console.error(err);
      setError("Something went wrong while updating links!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content">
        <span onClick={hideForm} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <h2>Social links</h2>
          <form onSubmit={handleSocialLinksSubmit}>
            {Object.keys(socialLinks).map((platform) => (
              <div key={platform}>
                <label>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
                <input
                  type="text"
                  className="w-35"
                  name={platform}
                  value={socialLinks[platform as keyof socialLinksProps]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button
              disabled={
                isLoading || Object.values(socialLinks).some((link) => !link)
              }
              type="submit"
              className="btn"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
        {error && (
          <span className="color-error text-center fs-2 my-1">{error}</span>
        )}
      </div>
    </div>
  );
};
