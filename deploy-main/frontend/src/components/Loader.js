/* REACT BOOTSTRAP */
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from 'react-i18next';

export default function Loader() {
  const { t, i18n } = useTranslation();
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="visually-hidden">{t('Loading')}...</span>
    </Spinner>
  );
}
