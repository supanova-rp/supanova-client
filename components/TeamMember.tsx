import styles from '@/styles/Team.module.css';

interface Props {
  image: HTMLImageElement,
  name: string,
  expertise: string,
  description: string,
}

const TeamMember: React.FC<Props> = ({ name, expertise, description, image }) => {
  return ( 
    <div className={styles.teamMemberContainer}>
      <img src={image.src} alt={name} className={styles.profileImage} />
      <h3 className={styles.teamMemberName}>{name}</h3>
      <p>{expertise}</p>
      <p className={styles.description}>{description}</p>
    </div>
   );
}
 
export default TeamMember;