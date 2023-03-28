import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProjectCard.module.css';

import {Link} from 'react-router-dom'

export function ProjectCard({id,currency,name,price,category,convertedPrice,quantityCategory,quantityTime,time, handleRemove}){

    const currencySymbol = currency === 'BRL' ? '$' : 'R$';
    const currencySymbolConvertido = currency === 'BRL' ? 'R$' : '$';

    const budget = quantityCategory * quantityTime * convertedPrice

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
       <div className={styles.project_card}>
        <h4>{name}</h4>
        <p> 
            <span>Preço:</span> {currencySymbol} {price}
        </p>
        {currency === "USD" ? (  <p> 
            <span>Preço Convertido:</span> {currencySymbolConvertido} {currency === "USD" ? convertedPrice : price}
        </p>) : null}
        <p>
            <span>Orçamento Total:</span>  {currencySymbolConvertido} {budget}
        </p>
        <p className={styles.time_text}>
            <span className={`${styles[time?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')]}`}></span> {time} - {quantityTime}
        </p>
        <p className={styles.category_text}>
            <span className={`${styles[category?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')]}`}></span> {category} - {quantityCategory}
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