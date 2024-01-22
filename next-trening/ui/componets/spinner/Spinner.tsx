import { CgSpinnerTwoAlt } from "react-icons/cg";
import styles from "./Spinner.module.css";
import { cc } from "@/utils/classes";

const Spinner = ({ classes }: { classes?: string[] }) => (
  <CgSpinnerTwoAlt
    className={classes ? cc([styles.spinner, ...classes]) : styles.spinner}
  />
);

export default Spinner;
