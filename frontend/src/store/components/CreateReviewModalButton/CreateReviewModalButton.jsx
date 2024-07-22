import { useModal } from '../../../context/Modal';
import './CreateReviewModalButton.css';

function CreateReviewModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };


  return <button onClick={onClick} className='createReviewModalButton'>{buttonText}</button>;
}

export default CreateReviewModalButton;
