import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProjectCard.module.css';

import {Input} from '../form/Input'
import {Link} from 'react-router-dom'

export function ProjectCard({id,currency,name,budget,price,convertedPrice, category,quantityCategory,quantityTime,time, handleRemove}){

    const currencySymbol = currency === 'BRL' ? 'R$' : '$';

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
       <div className={styles.project_card}>
        <h4>{name}</h4>
        <p> 
            <span>Preço:</span> {currencySymbol} { currency === "USD" ? convertedPrice : price}
        </p>
        <p>
            <span className={`${styles[currency?.toLowerCase()]}`}>Moeda:</span> {currency}
        </p>
        <p>
            <span>Orçamento Total:</span>  {currencySymbol} {budget}
        </p>
        <p className={styles.time_text}>
            <span className={`${styles[time?.toLowerCase()]}`}></span> {time} - {quantityTime}
        </p>
        <p className={styles.category_text}>
            <span className={`${styles[category?.toLowerCase()]}`}></span> {category} - {quantityCategory}
        </p>
        <div className={styles.project_card_actions}>
            <Link to={`/project/${id}`}>
                <BsPencil/> Editar
            </Link>
            <button onClick={remove}>
                <BsFillTrashFill/> Excluir
            </button>
        </div>
       </div>
    )
}