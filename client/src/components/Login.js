import '../styles/Login.scss';


export const Login = (props) => {
  return (
    <div className="main form-container">


      <form name="login">

        <h4 className="form-title">Log in here:</h4>

        <div className="container-full">
          <label for="username">Username:</label>
          <input type="text" name="username" placeholder="Username"/>
        </div>

        <div className="container-full">
          <label for="password">Password:</label>
          <input type="password" name="password" placeholder="Password"/>
        </div>

        <div className="container-full">
          <input className="submit-button" type="submit" name="submit"/>
        </div>

      </form>


      <form name="register">

        <h4 className="form-title">Not a user? Register here:</h4>

        <div className="container-full">
          <label for="username">Username:</label>
          <input type="text" name="username" placeholder="Username"/>
        </div>

        <div className="container-full">
          <label for="email">Email:</label>
          <input type="email" name="email" placeholder="Email"/>
        </div>

        <div className="container-full">
          <label for="password">Password:</label>
          <input type="password" name="password" placeholder="Password"/>
        </div>

        <div className="container-full">
          <input className="submit-button" type="submit" name="submit"/>
        </div>

      </form>


    </div>
  )
}