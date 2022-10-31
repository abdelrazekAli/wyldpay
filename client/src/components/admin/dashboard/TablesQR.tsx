import { useState } from "react";
import QRcode from "qrcode.react";
import "../../../styles/tablesQR.sass";
import { downloadQR } from "../../../utils/QR";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const TablesQR = () => {
  const { restaurantId } = useAppSelector(getUser);
  const [tableNum, setTableNum] = useState<number | null>(null);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  return (
    <>
      {isFormVisible && (
        <div id="myModal" className="modal form-modal">
          <div className="modal-content p-relative custom-content">
            <span
              onClick={() => setFormVisible(!isFormVisible)}
              className="modal-close"
            >
              &times;
            </span>
            <div className="main-content qr-main-content">
              <input
                type="number"
                placeholder="Enter table number"
                className="mb-1"
                onChange={(e) => setTableNum(Math.round(+e.target.value))}
              />
              <button
                disabled={!tableNum}
                className="btn"
                onClick={() => setFormVisible(!isFormVisible)}
              >
                Generate QR
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="qr-table w-100">
        <div className="container">
          <div className="content">
            <div>
              <h3>QR Generator</h3>
              <p>Add table number to generate its QR code </p>
            </div>
            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                onClick={() => {
                  setTableNum(null);
                  setFormVisible(!isFormVisible);
                }}
              >
                + Add table
              </button>
            </div>
          </div>
          <div className="qr-content">
            {tableNum && (
              <>
                <h4>Table {tableNum}</h4>
                <QRcode
                  id="myqr"
                  value={`${process.env.REACT_APP_BASE_URL}/menu/${restaurantId}/${tableNum}`}
                  size={320}
                  includeMargin={true}
                  className="qr-responsive"
                />
                <div className="btn-container">
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => downloadQR(tableNum!)}
                  >
                    Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
