import type { CourseTitle } from '../types';

const Header = ({courseName}: CourseTitle) => {
  //console.log('----', props);
  
  return (
    <div>
      <h3>{courseName}</h3>
    </div>
  )
}

export default Header;