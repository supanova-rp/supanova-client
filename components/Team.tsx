import { teamMembers } from '@/constants/constants';
import styles from '@/styles/Team.module.css';

import SectionTitle from './SectionTitle';
import TeamMember from './TeamMember';

const Team = () => {
  return (
    <div className={styles.teamContainer}>
      <SectionTitle title="Meet the Team" />
      <div className={styles.teamMembersContainer}>
        {teamMembers.map((member) => {
          return <TeamMember name={member.name} expertise={member.tagLine} description={member.description} image={member.image} />;
        })}
      </div>
    </div>
  );
};

export default Team;
