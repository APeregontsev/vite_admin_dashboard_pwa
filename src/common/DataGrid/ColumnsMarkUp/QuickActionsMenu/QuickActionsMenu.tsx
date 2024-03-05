import "./style.css";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { DotsIconSVG } from "./Icons/MarkUpIcons";
import { QuickAction, QuickActionsWrapper } from "./style";
import { useNotify } from "hooks/useNotify";
import { useDeleteEntry } from "store/slices/loadDataHooks";
import SuccessMessage from "common/SuccessMessage/SuccessMessage";
import { initialDataURL } from "api/api";
import Modal from "common/Modal";
import ConfirmPlate from "common/Modal/ConfirmPlate";
import UpdatingForm from "common/UpdatingForm";

export function Options<DataRow extends Record<string, any>>({
  item,
  type,
}: {
  item: DataRow;
  type: string;
}): JSX.Element {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const notify = useNotify();

  const { isLoading, deleteEntry } = useDeleteEntry(initialDataURL[type].url, item?.id);

  // Deleting entry

  async function removeEntry() {
    const requestSuccess = await deleteEntry();

    if (requestSuccess) {
      notify(<SuccessMessage item={item} type={type} action={"Delete"} />, "success");
      setShowConfirm(false);
    }
  }

  function closeConfirmModal() {
    setShowConfirm(false);
  }

  function onDelete() {
    setShowConfirm(true);
  }

  function showEdit() {
    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
  }

  return (
    <>
      <QuickActionsWrapper data-tooltip-id={`${item.id}${type}`} data-tooltip-delay-show={300}>
        <DotsIconSVG />

        <Modal isShown={showConfirm} onClose={() => setShowConfirm(false)}>
          <ConfirmPlate
            isLoading={isLoading}
            title={item.title ? item.title : item.name}
            onConfirm={() => removeEntry()}
            onCancel={closeConfirmModal}
          />
        </Modal>
      </QuickActionsWrapper>

      <Tooltip
        id={`${item.id}${type}`}
        className="quick-actions-style"
        disableStyleInjection={"core"}
        /*     isOpen={showActions} */
        closeOnEsc
        /*   openOnClick */
        clickable
        place="bottom-end"
        noArrow
        offset={0}
      >
        <QuickAction onClick={showEdit}> Edit </QuickAction>
        <QuickAction $red onClick={onDelete}>
          Delete
        </QuickAction>
      </Tooltip>

      <Modal isShown={showEditModal} onClose={closeEditModal}>
        <UpdatingForm type={type} onClose={closeEditModal} item={item} />
      </Modal>
    </>
  );
}
