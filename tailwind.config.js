/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        // viết ở ngoài theme là overwrite => những cái default mất hết
        // đặt tên là sans ==> tự update font cho toàn bộ app
        fontFamily: {
            sans: 'Roboto Mono,monospace',
        },
        // trong extends là viết thêm, ==> các color default vẫn giữ nguyên chỉ thêm pizza pizza: '#FAFFAF',
        extend: {
            colors: {
                pizza: '#FAFFAF',
            },

            height: {
                // xem : https://blog.stackademic.com/exploring-css-units-unleashing-the-power-of-dvh-over-vh-1ff61b9c87ae
                //  // fix problem trên mobile height screen
                screen: '100dvh',
            },

            fontSize: {
                // cách viết nhiều thuộc tính cho 1 extends className
                // huge: ['50rem', { lineHeight: '1' }],
            },
        },
    },
    plugins: [],
}
