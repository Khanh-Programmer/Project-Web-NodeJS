const inputFile = document.querySelector("[upload-image-input]");
const previewImg = document.querySelector("[upload-image-preview]");
const removeBtn = document.querySelector(".remove-image");

if (inputFile && previewImg && removeBtn) {
     inputFile.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onload = (ev) => {
                    previewImg.src = ev.target.result;
                    previewImg.style.display = "block";
                    removeBtn.style.display = "block";
               };
               reader.readAsDataURL(file);
          }
     });

     removeBtn.addEventListener("click", () => {
          inputFile.value = "";
          previewImg.src = "";
          previewImg.style.display = "none";
          removeBtn.style.display = "none";
     });
}