import React from "react";
import "./FormOptions.style.css";

const FormOptions = ({
  type,
  name,
  id,
  text,
  accept,

  values,
  setValues,
  minValue,
  maxValue,
  placeholder,
  styleLabel,
  styleItem,
  formItem,
  rows,
  cols,
  dropdownList,
  multiple,
  disabled,
}) => {
  return (
    <div className="formOptions">
      {formItem === "button" ? (
        <button
          type={type}
          onClick={setValues ? setValues : (e) => e.preventDefault()}
          disabled={disabled ? disabled : false}
          className="formOptions__button"
          style={
            styleItem
              ? styleItem
              : { backgroundColor: disabled && "rgba(128, 128, 128, 0.315)" }
          }
        >
          {text}
        </button>
      ) : (
        <>
          <label
            htmlFor={id}
            className={
              type === "file"
                ? "formOptions__label__file"
                : "formOptions__label__others"
            }
            style={styleLabel ? styleLabel : {}}
          >
            {text}
          </label>

          {formItem === "input" ? (
            <input
              type={type}
              id={id}
              name={name}
              value={values && values}
              accept={accept && accept}
              multiple={multiple ? true : false}
              onChange={setValues}
              min={minValue ? minValue : null}
              max={maxValue ? maxValue : null}
              placeholder={placeholder ? placeholder : `Enter ${text}`}
              className={
                type === "file"
                  ? `formOptions__input__file`
                  : "formOptions__input__others"
              }
              style={styleItem ? styleItem : {}}
            />
          ) : formItem === "textArea" ? (
            <textarea
              id={id}
              cols={cols ? cols : "10"}
              rows={rows ? rows : "3"}
              name={name}
              value={values}
              onChange={setValues}
              placeholder={placeholder ? placeholder : ""}
              className="formOptions__textArea"
              style={styleItem ? styleItem : {}}
            ></textarea>
          ) : formItem === "dropdown" ? (
            <select
              id={id}
              value={values}
              name={name}
              onChange={setValues}
              placeholder={placeholder ? placeholder : ""}
              className="formOptions__select"
              style={styleItem ? styleItem : {}}
              multiple={multiple ? true : false}
            >
              {dropdownList?.map((list) => (
                <option
                  className="formOptions__select__list"
                  key={list}
                  value={list}
                >
                  {list}
                </option>
              ))}
            </select>
          ) : (
            <h3 className="formOptions__select__info">
              Form Item Values(formItem) = "input/textArea/Drowdown"
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default FormOptions;
