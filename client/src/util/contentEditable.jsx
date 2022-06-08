export const useKeyBoardToSaveTitle = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
};

export const selectAllTextField = (e) => {
  e.target.focus();
  e.target.select();
  // document.execCommand('selectAllTextField', false, null)
};
