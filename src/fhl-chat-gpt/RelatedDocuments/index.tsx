import React, { useCallback, useMemo } from "react";
import { DataType, DocumentInfoType } from "../index.interface";
import styles from "./index.less";
import Document from "./Document";

interface IRelatedDocumentsProps {
  data: DataType;
  onChange?: (newData: DataType) => void;
}

const RelatedDocuments: React.FC<IRelatedDocumentsProps> = ({ data, onChange }) => {
  const documents = useMemo(
    () => data?.documents?.map((item, index) => ({ ...item, index })) ?? [],
    [data]
  );

  const handleChange = useCallback(
    (doc: DocumentInfoType, id: number) => {
      const dataCopy = { ...data };

      if (!dataCopy.documents) {
        dataCopy.documents = [];
      }

      dataCopy.documents[id] = doc;
      onChange?.(dataCopy);
    },
    [documents]
  );

  return (
    <>
      <h2 className={styles.title}>Related Documents</h2>
      <div className={styles.container}>
        {documents.map(item => (
          <Document key={item.index} id={item.index} doc={item} onChange={handleChange}></Document>
        ))}
      </div>
    </>
  );
};

export default RelatedDocuments;
