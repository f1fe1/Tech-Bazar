import styles from "./EmptyCart.module.css";
import Link from "next/link";
import Image from "next/image";
function EmptyCart() {
    return (
        <>
      <main className={styles.epmty_info}>
        <div className={styles.empty_title}>
          <h2>Кoшик порожній</h2>
          {/* <img height={32} width={32} src="/images/smile.svg"/> */}
        </div>
        <span>Скоріш за все ви ще не робили замовлення.</span>
        <span> Для здійснення замовлення поверніться на головну сторінку.</span>
        <Image height={300} width={280} src="/cart.png" alt="img" />
        <Link href="/">
        <button>НAЗАД</button>
        </Link>
      </main>
     </>
    );
}
export default EmptyCart;
