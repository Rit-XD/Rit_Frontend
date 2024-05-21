import {Spinner} from "@nextui-org/spinner";
import css from './Loader.module.scss'
import { fromModule } from "@/utils/styler/Styler";

const styles = fromModule(css)


export const Loader = () => {
  return (
    <div className={styles.container()}>
    <Spinner size="lg" color="warning" />
  </div> 
  )
}
