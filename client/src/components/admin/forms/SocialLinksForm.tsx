import axios from "axios";
import { useState, useEffect } from "react";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const SocialLinksForm = ({ hideForm }: { hideForm: () => void }) => {
  const { _id } = useAppSelector(getUser);

  const [google, setGoogle] = useState<string>("https://g.page/");
  const [youtube, setYoutube] = useState<string>("https://youtube.com/");
  const [twitter, setTwitter] = useState<string>("https://twitter.com/");
  const [telegram, setTelegram] = useState<string>("https://telegram.org/");
  const [instagram, setInstagram] = useState<string>("https://instagram.com/");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch links
    const fetchLinks = async () => {
      const res = await axios.get(`/api/v1/users/${_id}`);
      res.data.socialLinks?.map((link: { name: string; value: string }) => {
        link.name === "google" && setGoogle(link.value);
        link.name === "youtube" && setYoutube(link.value);
        link.name === "twitter" && setTwitter(link.value);
        link.name === "telegram" && setTelegram(link.value);
        link.name === "instagram" && setInstagram(link.value);
        return 0;
      });
    };
    fetchLinks();
  }, [_id]);

  // Handle update social links
  const SocialLinksForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    try {
      let res = await axios.put(`/api/v1/users/links/${_id}`, {
        socialLinks: [
          { name: "google", value: google },
          { name: "youtube", value: youtube },
          { name: "twitter", value: twitter },
          { name: "telegram", value: telegram },
          { name: "instagram", value: instagram },
        ],
      });
      console.log(res.data);
      hideForm();
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content">
        <span onClick={hideForm} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <h2>Social links</h2>
          <form onSubmit={SocialLinksForm}>
            <label>Google reviews</label>
            <input
              type="text"
              className="w-35"
              value={google}
              onChange={(e) => setGoogle(e.target.value)}
            />
            <label>Twitter</label>
            <input
              type="text"
              className="w-35"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <label>Telegram</label>
            <input
              type="text"
              className="w-35"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            <label>Youtube</label>
            <input
              type="text"
              className="w-35"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
            <label>Instagram</label>{" "}
            <input
              type="text"
              className="w-35"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <button
              disabled={
                !google || !youtube || !instagram || !telegram || !twitter
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
