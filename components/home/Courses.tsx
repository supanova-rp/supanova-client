import Header from './Header'

interface Props {
  logoutError: string,
}

const Courses: React.FC<Props> = ({ logoutError }) => {
  return (
    <div>
      <div>
        <Header title="Course Curriculum" logoutError={logoutError} />
      </div>
      <div>
        <h5 className="mt-4">Chapter 1: Managing Stakolders</h5>
        <table className="table table-bordered mt-5">
          <tbody>
            <tr>
              <th>Hello</th>
              <td>Hello</td>
            </tr>
            <tr>
              <th>Hello</th>
              <td>Hello</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default Courses;