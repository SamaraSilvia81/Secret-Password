import { Link } from 'react-router-dom';
import { Container } from './Container'
import styles from './NavBar.module.css'
import logo from '../../img/battossai.png'

export function NavBar(){
    return(
        <nav className={styles.navBar}>
          <Container>
            <Link to='/'><img src={logo} alt="Calcualtor Logo"/></Link>
            <ul className={styles.list}>
              <li className={styles.item}><Link to='/'>Home</Link></li>
              <li className={styles.item}><Link to='/projects'>Produtos</Link></li>
              <li className={styles.item}><Link to='/about'>Sobre</Link></li>
              <li className={styles.item}><Link to='/contact'>Contato</Link></li>
            </ul>
          </Container>
        </nav>
    )
}