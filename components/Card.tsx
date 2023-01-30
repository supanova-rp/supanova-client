import styles from '@/styles/Services.module.css'

interface Props {
  icon: HTMLImageElement,
  title: string,
  describedServices: string[],
  colors: string[],
}

const Card: React.FC<Props> = ({ icon, title, describedServices, colors }) => {
  return (
    <div className={styles.card} style={{background: `linear-gradient(${colors[1]}, ${colors[0]})`, opacity: '75%'}}>
      <div className={styles.headerContainer}>
      <img src={icon.src} alt={title} className={styles.servicesIcon}/>
      <h3 className={styles.serviceTitle}>{title}</h3>
      </div>
      {describedServices.map((service) => {
        return <p>{service}</p>
      })}
    </div>
   );
}
 
export default Card;