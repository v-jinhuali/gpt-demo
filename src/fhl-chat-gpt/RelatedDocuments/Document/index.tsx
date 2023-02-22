import { DocumentInfoType } from "@/fhl-chat-gpt/index.interface";
import React, { useCallback } from "react";
import styles from "./index.less";
import cn from "classnames";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ids } from "webpack";

interface IDocumentProps {
  id: number;
  doc: DocumentInfoType;
  onChange: (doc: DocumentInfoType, id: number) => void;
}

const Document: React.FC<IDocumentProps> = ({ id, doc, onChange }) => {
  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      const copyDoc = { ...doc };
      copyDoc.checked = e.target.checked;
      onChange?.(copyDoc, id);
    },
    [doc]
  );

  return (
    <div className={cn(styles.messageContainer)}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Checkbox checked={doc.checked} onChange={handleChange}></Checkbox>
          <div className={styles.name}>{<span>{doc.name}</span>}</div>
          <p>{doc.link}</p>
          <p>{doc.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Document;
