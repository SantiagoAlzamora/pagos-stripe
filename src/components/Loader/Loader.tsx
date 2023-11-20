import styles from './styles.module.css'

export default function Loader({ size = 30 }: { size?: number }) {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }}></div>
  )
}
