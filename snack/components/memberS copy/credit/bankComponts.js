import React from 'react';
import styles from "@/styles/form.module.css";
import Image from 'next/image';

export default function CreditComponts({ title = "aa", data = [] }) {
  return (
    <div className={styles.credit}>
      <h4 className='creditTitle'>{title}</h4>
      {data.map((v, i) => (
        <div className="creditItem" key={i}>
          <div className="form-check">
            <Image src="/face/ch.jpeg" alt="Description" width={60} height={60} />
            <div className="time" style={{ textAlign: 'center' }}>
              2024/03/01 <br />
              {v.title} ${v.data}
            </div>
            <input className="form-check-input" type="checkbox" value="" id={`flexCheckIndeterminate${i}`} />
            <label className="form-check-label" htmlFor={`flexCheckIndeterminate${i}`}></label>
          </div>
        </div>
      ))}
    </div>
  );
}
