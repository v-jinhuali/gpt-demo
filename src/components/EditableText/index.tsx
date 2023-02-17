import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";

import styles from "./index.less";

interface IEditableTextProps {
  className?: string;
  id: number | string;
  value: string;
  onChange?: (value: string, id: number | string) => void;
}

const EditableText: React.FC<IEditableTextProps> = ({ className, id, value, onChange }) => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const inputValueRef = useRef(value);

  const handleDoubleClick = useCallback(() => {
    setIsEditable(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsEditable(false);
  }, []);

  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    inputValueRef.current = target.textContent ?? "";
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onChange?.(inputValueRef.current, id);
        inputRef.current && inputRef.current.blur();
      }
    },
    [id, onChange]
  );

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();

      const range = window.getSelection();
      if (range) {
        range.selectAllChildren(inputRef.current);
        range.collapseToEnd();
      }
    }
  }, [isEditable]);

  return (
    <div className={cn(styles.container, isEditable && styles.editableContainer, className)}>
      {!isEditable ? (
        <div key={"not-editable"} className={styles.content} onDoubleClick={handleDoubleClick}>
          <span>{value}</span>
        </div>
      ) : (
        <div
          key={"editable"}
          ref={inputRef}
          className={styles.content}
          contentEditable={isEditable}
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
        >
          <span>{value}</span>
        </div>
      )}
    </div>
  );
};

export default EditableText;
