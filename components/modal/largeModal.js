import React from 'react';

import Image from 'next/image'
import Backdrop from '../backdrop/backdrop'

import styles from './largeModal.module.css'

const LargeModal = (props) => (  
    <>
        <Backdrop clicked={props.clicked} show={props.show}/>
        <div className={styles.dashboard_large_modal}
            style ={{
                transform: props.show ? 'translateY(0)':'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <button onClick={props.clicked} className={styles.dashboard_large_modal__close}>
                <Image
                    priority
                    src="/images/modal_close.png"
                    className={styles.dashboard_large_modal__close__img}
                    layout="fill"
                    // height={32}
                    // width={32}
                    alt={"close icon"}
                />
                {/* <img src={CloseIcon} alt="close" className="dashboard-large-modal__close__img" /> */}
            </button>
            <div className={styles.dashboard_large_modal__main}>{props.children}</div>
        </div>
    </>
);

export default LargeModal;