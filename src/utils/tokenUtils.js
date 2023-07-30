export const getTokenFromLocalStorage = () => {
    // Lấy token từ local storage
    const token = localStorage.getItem("token");
    return token;
};
export const setTokenToLocalStorage = (token) => {
    // Lưu token vào local storage
    localStorage.setItem("token", token);
};
export const removeTokenFromLocalStorage = () => {
    // Xóa token trong local storage
    localStorage.removeItem("token");

};