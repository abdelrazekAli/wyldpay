export const downloadQR = (tableNum: number) => {
  const svg = document.getElementById("myqr") as HTMLElement;
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `table-${tableNum}-QR.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(svgUrl);
};
