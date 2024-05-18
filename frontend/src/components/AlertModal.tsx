type AlertProps = { alertMsg: { h3: string; p: string } };

export const AlertModal = ({ alertMsg }: AlertProps) => {
  return (
    <dialog
      id="my_modal_1"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{alertMsg.h3}</h3>
        <p className="py-4">{alertMsg.p}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
