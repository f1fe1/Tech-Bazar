import styles from "./FullCart.module.css";
import Item from "./Items";
import { useSelector, useDispatch } from "react-redux";
import { clearItems } from "@/app/Redux/cartSlice";
import Link from "next/link";
import Image from "next/image";
function FullCart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalCount = useSelector((state) => state.cart.totalCount);
    const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);
    const dispatch = useDispatch();
    return (
        <>
            <main>
                <div className={styles.cart}>
                    <div className={styles.head}>
                        <div className={styles.title_cart}>
                            {/* <img
                                width={30}
                                height={30}
                                src="images/cart2.png"
                                alt="cart"
                            /> */}
                            <h1 className={styles.h1}>Кошик</h1>
                        </div>
                        
                    </div>
                    <div className={styles.cart_content}>
                        <div className={styles.cart_items}>
                            {cartItems.map((item, index) => (
                                <Item
                                    key={item.price}
                                    _id={item._id}
                                    imgmain={item.imgmain}
                                    title={item.title}
                                    price={item.price}
                                    count={item.count}
                                    type={item.type}
                                    sizes={item.sizes}
                                />
                            ))}
                        </div>
                        <div className={styles.cart_footer}>
                            <div className={styles.total_info}>
                                <div className={styles.total_count}>
                                    Всього товарів: <span>{totalCount} шт.</span>
                                </div>
                                <div className={styles.total_price}>
                                    Сума замовлення:{" "}
                                    <span>{cartTotalPrice} ₴</span>
                                </div>
                            </div>
                            <div className={styles.cart_buts}>
                            <Link href="cart/orders">
                                    <button className={styles.buy}>
                                        ОФОРМИТИ 
                                    </button>
                                </Link>
                                <Link href="/">
                                    <button className={styles.c_back}>
                                    НАЗАД
                                    </button>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default FullCart;
