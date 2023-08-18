const imagePickerElement = document.querySelector(
    "#image-upload-control input"
  ),
  imagePreviewElement = document.querySelector("#image-upload-control img");
function updateImagePreview() {
  const e = imagePickerElement.files;
  if (!e || 0 === e.length)
    return void (imagePreviewElement.style.display = "none");
  const t = e[0];
  (imagePreviewElement.src = URL.createObjectURL(t)),
    (imagePreviewElement.style.display = "block");
}
imagePickerElement.addEventListener("change", updateImagePreview);
