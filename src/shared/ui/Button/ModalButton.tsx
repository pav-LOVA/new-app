
import { type ModalButtonInterface} from '../../../interfaces/modal-button.interface'


function ModalButton({ onClick }: ModalButtonInterface) {
  return (
    <div>
      <button className='button' onClick={onClick}>
        О проекте
      </button>
    </div>
  );
}


export default ModalButton;