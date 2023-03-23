import styles from './About.module.css'
import bidweb from '../../img/battossai.png'

export function About(){
    return(
        <section className={styles.about_container}>
        <div>
          <div className={styles.img}>
            <img
              src={bidweb}
              alt=''
            />
            <div className={styles.about_div}>
              <div>
                <h2>
                  Calculadora Battossai
                </h2>
                <p>
                    BidWeb Security Id
                </p>
                <hr/>
                <p className={styles.text}>
                  É um sistema de cadastro de produtos refernetes ao battossai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}