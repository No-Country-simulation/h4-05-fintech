import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ReactPortal, cloneElement } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  className?: string;
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
};

export const Modal = ({
  children,
  onCloseModal,
  showModal,
  className
}: ModalProps): ReactPortal | null => {
  const ref = useOutsideClick<HTMLDivElement>(onCloseModal);

  if (!showModal) return null;

  return createPortal(
    <div
      id="modal"
      className={`${className} w-full z-10 fixed inset-0 bg-black/70 transition duration-300 ease-out`}
    >
      <div ref={ref}>
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};