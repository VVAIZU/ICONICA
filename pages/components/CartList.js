import React from 'react'

const CartList = ({ data }) => {
    const {ptitle, pdesc, pprice } = data

    return (
        <div>

            <div className='bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between'>
                <div>
                    <div className='font-bold text-2x1'>{ptitle}</div>
                    <div>Price: {pprice}</div>
                </div>
            </div>

        </div>
    );
};

export default CartList;
