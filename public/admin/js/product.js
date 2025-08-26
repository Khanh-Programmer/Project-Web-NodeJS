// xử lý logic trang sản phẩm

// Change-Status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonsChangeStatus.length > 0) { 
     const formChangeStatus = document.querySelector('#form-change-status'); 
     const path = formChangeStatus.getAttribute('data-path'); 
     console.log(path); 
     buttonsChangeStatus.forEach((button) => {
          button.addEventListener('click', () => {
               const statusCurrent = button.getAttribute('data-status');
               const id = button.getAttribute('data-id');
               let statusChange = statusCurrent == 'active' ? 'inactive' : 'active'; 
              
               const action = `${path}/${statusChange}/${id}?_method=PATCH`;
               formChangeStatus.action = action;

               formChangeStatus.submit();
          });
     });
}
// End-Change-Status

// Delete-Item
const buttonsDeleteItem = document.querySelectorAll('[button-delete-item]'); 
if (buttonsDeleteItem.length > 0) {
     const formDeleteItem = document.querySelector('#form-delete-item');
     buttonsDeleteItem.forEach((button) => {
          button.addEventListener('click', () => {
               const checkConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
               if (checkConfirm) {
                    const id = button.getAttribute('data-id'); 
                    // console.log(id);
                    const path = formDeleteItem.getAttribute('data-path');
                    const action = `${path}/${id}?_method=DELETE`;
                    formDeleteItem.action = action;
                    formDeleteItem.submit(); 
               }
          });
     });
}
// End-Delete-Item

// Restore-Item
const buttonsRestoreItem = document.querySelectorAll('[button-restore-item]');
if (buttonsRestoreItem.length > 0) {
     const formRestoreItem = document.querySelector('#form-restore-item');
     buttonsRestoreItem.forEach((button) => {
          button.addEventListener('click', () => {
               const checkConfirm = confirm("Bạn có chắc chắn muốn khôi phục sản phẩm này không?");
               if (checkConfirm) {
                    const id = button.getAttribute('data-id');
                    const path = formRestoreItem.getAttribute('data-path');
                    const action = `${path}/${id}?_method=PATCH`;
                    formRestoreItem.action = action;
                    formRestoreItem.submit();
               }
          });
     });
}
// End-Restore-Item
