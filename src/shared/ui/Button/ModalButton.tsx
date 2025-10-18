interface ModalButtonI {
  onClick: () => void;
}

function ModalButton({ onClick }: ModalButtonI) {
  return (
    <div>
      <button className='button' onClick={onClick}>
        О проекте
      </button>
    </div>
  );
}


export default ModalButton;