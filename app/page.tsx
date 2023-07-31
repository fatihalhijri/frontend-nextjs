import Latihan from "./component/Latihan"
import Button from "./component/button"
function Home(){
    return(
        <>
        <h1>Hello world</h1>
        <Latihan name={'fatih'} username="fatih" age={16} isVerified={true} />
        {/* <Latihan name={'izzan'} username="izzan" age={16} isVerified={true} />
        <Latihan name={'zaky'} username="zaky" age={16} isVerified={false} /> */}

          <Button title="save" isDisabled />
          <Button title="cancel" isDisabled={false} />

       
        </>
    );
}

export default Home;