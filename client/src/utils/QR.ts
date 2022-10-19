export const downloadQR = (tableNum: number) => {
  const canvas: any = document.getElementById("myqr")!;
  const pngUrl = canvas
    ?.toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = `table-${tableNum}-QR.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
