// Button-Status  
const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
     buttonStatus.forEach((button) => {
          let url = new URL(window.location.href);
          button.addEventListener('click', (e) => {
               const status = e.target.getAttribute('button-status');
               // console.log(status);
               if (status) {
                    url.searchParams.set('status', status);
               } else {
                    url.searchParams.delete('status');
               }
               // console.log(url.href); 
               window.location.href = url.href; // Chuyển hướng đến URL mới với tham số status
          });
     });
}
// End-Button-Status

// Form-Search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
     let url = new URL(window.location.href);
     formSearch.addEventListener('submit', (e) => {
          e.preventDefault(); // Ngăn chặn event mặc định của form
          const keyword = e.target.elements.keyword.value;
          if (keyword) {
               url.searchParams.set('keyword', keyword);
          } else {
               url.searchParams.delete('keyword');
          }
          window.location.href = url.href; // Chuyển hướng đến URL mới với tham số keyword
     });
}
// End-Form-Search

// Pagination 
const buttonPagination = document.querySelectorAll('[button-pagination]');
if (buttonPagination.length > 0) {
     buttonPagination.forEach((button) => {
          let url = new URL(window.location.href);
          button.addEventListener('click', (e) => {
               const page = e.target.getAttribute('button-pagination');
               if (page) {
                    url.searchParams.set('page', page);
               } else {
                    url.searchParams.delete('page');
               }
               window.location.href = url.href; // Chuyển hướng đến URL mới với tham số page
          });
     });
}
// End-Pagination

// Checkbox
const checkboxMulti = document.querySelector('[checkbox-multi]');
if (checkboxMulti) {
     const inputIds = checkboxMulti.querySelectorAll('input[name="id"]');
     const inputCheckAll = checkboxMulti.querySelector('input[name="check-all"]');

     inputCheckAll.addEventListener('click', (e) => { 
          if (inputCheckAll.checked === true) {
               inputIds.forEach((inputId) => {
                    inputId.checked = true; 
               });
          } else {
               inputIds.forEach((inputId) => {
                    inputId.checked = false;
               });
          }
     });

     inputIds.forEach((input) => {
          input.addEventListener('click', (e) => {
               const countChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked').length;
               if (countChecked === inputIds.length) {
                    inputCheckAll.checked = true;
               } else {
                    inputCheckAll.checked = false;
               }
          });
     });
}
// End-checkbox

// Form-Change-Multi
const formChangeMulti = document.querySelector('[form-change-multi]'); 
if (formChangeMulti) {
     formChangeMulti.addEventListener('submit', (e) => {
          // e.preventDefault();
          const checkboxMulti = document.querySelector('[checkbox-multi]');
          const inputsChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked');
          // console.log(inputsChecked);

          // Delete-Multi 
          const typeChange = e.target.elements.type.value;
          if (typeChange === 'delete-all') {
               const checkConfirm = confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn không?");
               if (!checkConfirm) {
                    e.preventDefault(); // Ngăn chặn form submit nếu không xác nhận
                    return;
               }
          }
          if (inputsChecked.length > 0) {
               let ids = []
               const inputIds = formChangeMulti.querySelector('input[name="ids"]');
               inputsChecked.forEach((input) => {
                    const id = input.value; // Lấy giá trị của từng input
                    if (typeChange === "change-position") {
                         const position = input.closest('tr').querySelector('input[name="position"]').value;
                         ids.push(`${id}-${position}`);
                    } else {
                         ids.push(id);
                    }
               });
               // console.log(ids.join(", "));
               inputIds.value = ids.join(", "); 
               formChangeMulti.submit(); 
          } else {
               alert('Vui lòng chọn ít nhất một sản phẩm để thay đổi trạng thái.');
          }
     });
}
// End-Form-Change-Multi

// Show-Alert
const showAlert = document.querySelectorAll('[show-alert]'); 
// console.log(showAlert);
if (showAlert) {
     showAlert.forEach(alert => {
          const time = parseInt(alert.getAttribute('data-time'));
          const closeAlert = alert.querySelector('[close-alert]');
          setTimeout(() => {
               alert.classList.add("alert-hidden");
          }, time);

          closeAlert.addEventListener('click', () => {
               alert.classList.add("alert-hidden");
          });
     });
}
// End-show-alert

// Uploads
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
     const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
     const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
     // console.log(uploadImageInput);
     // console.log(uploadImagePreview);

     uploadImageInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
               uploadImagePreview.src = URL.createObjectURL(file);
          } else {
               uploadImagePreview.src = "";
          }
     });
}
// End-Uploads

// Remove-image
const imageInput = document.querySelector('[upload-image-input]');
const uploadImagePreview = document.querySelector('[upload-image-preview]');
const buttonDeleteImage = document.querySelector('.remove-image');

// Hiển thị ảnh và nút X khi chọn file
if (imageInput && uploadImagePreview && buttonDeleteImage) {
     imageInput.addEventListener('change', () => {
          if (imageInput.files && imageInput.files[0]) {
               uploadImagePreview.src = URL.createObjectURL(imageInput.files[0]);
               buttonDeleteImage.style.display = "inline-block";
          }
     });

     buttonDeleteImage.addEventListener('click', () => {
          const checkConfirm = confirm("Bạn có chắc chắn muốn xóa hình ảnh này không?");
          if (checkConfirm) {
               imageInput.value = "";
               uploadImagePreview.src = "";
               buttonDeleteImage.style.display = "none";
          }
     });
}

// End-remove-image

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
     const sortSelect = sort.querySelector("[sort-select]");
     const sortClear = sort.querySelector("[sort-clear]");

     let url = new URL(window.location.href);
     sortSelect.addEventListener('change', (e) => {
          const value = e.target.value;
          // console.log(sortValue);
          const [sortKey, sortValue] = value.split("-");
          // console.log(sortKey);
          // console.log(sortValue);
          url.searchParams.set("sortKey", sortKey);
          url.searchParams.set("sortValue", sortValue);
          window.location.href = url.href; // Chuyển hướng đến URL mới với tham số sortKey và sortValue
     });

     sortClear.addEventListener('click', (e) => {
          url.searchParams.delete("sortKey");
          url.searchParams.delete("sortValue");
          window.location.href = url.href; // Chuyển hướng đến URL mới với tham số sortKey và sortValue
     });

     const sortKey = url.searchParams.get("sortKey");
     const sortValue = url.searchParams.get("sortValue");
     if (sortKey && sortValue) {
          const stringSort = `${sortKey}-${sortValue}`;
          const optionSelect = sortSelect.querySelector(`option[value='${stringSort}']`);
          optionSelect.selected = true;
     }
}

// End-Sort