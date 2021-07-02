import Container from 'react-bootstrap/Container';

const Card = (props) => {

    const style = {
        textAlign: 'center',
        margin: 'auto',
        padding: '30px'
    }

    return (
        <Container style={style}>{props.children}</Container>
    );
}

export default Card;