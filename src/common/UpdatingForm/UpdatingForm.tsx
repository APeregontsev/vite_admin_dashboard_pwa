import { createSelector } from "@reduxjs/toolkit";
import { initialDataURL } from "api/api";
import { useNotify } from "hooks/useNotify";
import { useAddEntry, useEditEntry } from "store/slices/loadDataHooks";
import { useAppSelector } from "store/store";
import { useForm } from "react-hook-form";
import { transformBooleans } from "utils";
import SuccessMessage from "common/SuccessMessage/SuccessMessage";
import { CardWrapper, Form } from "./style";
import { Title } from "ui/Titles";
import Input from "common/Input";
import Select from "common/Select";
import { CancelButton, MainButton } from "ui/Buttons";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";
import { useAddConfig } from "./useAddConfig";

type UpdatingFormProps<DataRow> = { type: string; onClose: () => void; item?: DataRow };

function UpdatingForm<DataRow extends Record<string, any>>(props: UpdatingFormProps<DataRow>) {
  const { onClose, type, item } = props;

  const CONFIG_ADD = useAddConfig();

  const notify = useNotify();

  const { isLoading: isLoadingAdd, addEntry } = useAddEntry(initialDataURL[type].url, type);
  const { isLoading: isLoadingEdit, editEntry } = useEditEntry(initialDataURL[type].url, type, item?.id);

  // Lets calculate new possible ID for ADDing item
  const selectData = (state: any) => state.data[type];

  const selectLastID = createSelector(selectData, (data) => {
    // Lets find last used ID in current entries list
    const lastIDofEntry = data.length ? data[data.length - 1].id : 0;
    return lastIDofEntry + 1;
  });

  const newID = useAppSelector(selectLastID);

  const dataForRender = CONFIG_ADD[type];

  // Lets define FLAG when we Editing item (if true).
  // Must contain ID -> cause we update entry on ID value via API
  const editAction = !!item?.id;
  const windowTitle = editAction ? "Edit " : "Add ";

  const isLoading = editAction ? isLoadingEdit : isLoadingAdd;

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // FORM SUBMIT HANDLER
  const onSubmit = async (data: Record<string, string>) => {
    transformBooleans(data);
    let requestSuccess;

    // Making corresponding API request depending on ADD / EDIT
    if (editAction) {
      requestSuccess = await editEntry({ ...data, id: item?.id, modified: Date.now() });
    } else {
      requestSuccess = await addEntry({ ...data, id: newID, modified: Date.now() });
    }

    // Lets close Modal Window if the request was successful
    if (requestSuccess) {
      notify(<SuccessMessage item={data} type={type} action={windowTitle} />, "success");
      onClose();
    }
  };

  return (
    <CardWrapper>
      <Title $add>
        {windowTitle}
        {type}
      </Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {dataForRender.inputs.map((input) => {
          if (input.inputType === "input")
            return (
              <Input
                register={register}
                rules={input.validation}
                key={input.name}
                type={input.type}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                warningMsg={errors[input.name]?.message ? errors[input.name]?.message?.toString() : ""}
                defaultValue={editAction ? item[input.name] : ""}
              />
            );

          if (input.inputType === "select")
            return (
              <Select
                register={register}
                key={input.name}
                name={input.name}
                label={input.label}
                rules={input.validation}
                selectedValue={editAction ? item[input.name] : input.selectedValue}
                selectOptions={input.options}
                labelValue={input.labelValue}
                warningMsg={errors[input.name]?.message ? errors[input.name]?.message?.toString() : ""}
              />
            );
        })}

        <MainButton type="submit" disabled={isLoading}>
          {isLoading ? <InlineLoader /> : "Save"}
        </MainButton>

        <CancelButton type="reset" onClick={onClose}>
          Cancel
        </CancelButton>
      </Form>
    </CardWrapper>
  );
}

export default UpdatingForm;
