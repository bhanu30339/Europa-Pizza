import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from '../public/assets/TARATOR TM_LOGO-1.png';

export function Footer() {
  return (
    <footer className="bg-[#4A1E1E] text-white relative font-['Playfair_Display']">
       <div className="border-t border-[#5a2a2a] text-right text-gray-400 text-xs ">
        {/* © {new Date().getFullYear()} All Rights Reserved Europa Pizza */}
        <div className="w-screen relative left-1/2  -ml-[50vw] -mr-[50vw]">
        <svg width="1550" height="16" viewBox="0 0 1441 14"  fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.15">
          <g clip-path="url(#clip0_27_5679)">
            <path d="M19.1689 15.3983V2.02092H2.60696V13.5071H12.9121V7.10947H8.86553V10.2227H6.65407V5.21772H15.1241V15.3983H0.395508V0.129175H21.3809V13.5071H37.9416V2.01942H27.6389V8.41952H31.6842V5.30482H33.8963V10.3098H25.4274V0.128174H40.1531V15.3983H19.1689Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip1_27_5679)">
            <path d="M62.9264 15.3986V2.02117H46.3645V13.5073H56.6696V7.10971H52.6231V10.2229H50.4116V5.21796H58.8817V15.3986H44.1531V0.129419H65.1385V13.5073H81.6992V2.01966H71.3964V8.41977H75.4418V5.30507H77.6538V10.31H69.185V0.128418H83.9107V15.3986H62.9264Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip2_27_5679)">
            <path d="M106.692 15.3986V2.02117H90.1299V13.5073H100.435V7.10971H96.3885V10.2229H94.177V5.21796H102.647V15.3986H87.9185V0.129419H108.904V13.5073H125.465V2.01966H115.162V8.41977H119.207V5.30507H121.419V10.31H112.95V0.128418H127.676V15.3986H106.692Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip3_27_5679)">
            <path d="M150.449 15.3986V2.02117H133.887V13.5073H144.193V7.10971H140.146V10.2229H137.935V5.21796H146.405V15.3986H131.676V0.129419H152.661V13.5073H169.222V2.01966H158.919V8.41977H162.965V5.30507H165.177V10.31H156.708V0.128418H171.434V15.3986H150.449Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip4_27_5679)">
            <path d="M194.207 15.3986V2.02117H177.645V13.5073H187.95V7.10971H183.904V10.2229H181.692V5.21796H190.162V15.3986H175.434V0.129419H196.419V13.5073H212.98V2.01966H202.677V8.41977H206.722V5.30507H208.934V10.31H200.466V0.128418H215.191V15.3986H194.207Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip5_27_5679)">
            <path d="M237.965 15.3986V2.02117H221.403V13.5073H231.708V7.10971H227.661V10.2229H225.45V5.21796H233.92V15.3986H219.191V0.129419H240.177V13.5073H256.737V2.01966H246.435V8.41977H250.48V5.30507H252.692V10.31H244.223V0.128418H258.949V15.3986H237.965Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip6_27_5679)">
            <path d="M281.722 15.3986V2.02117H265.16V13.5073H275.465V7.10971H271.419V10.2229H269.207V5.21796H277.677V15.3986H262.949V0.129419H283.934V13.5073H300.495V2.01966H290.192V8.41977H294.237V5.30507H296.449V10.31H287.981V0.128418H302.706V15.3986H281.722Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip7_27_5679)">
            <path d="M325.48 15.3986V2.02117H308.918V13.5073H319.223V7.10971H315.176V10.2229H312.965V5.21796H321.435V15.3986H306.706V0.129419H327.692V13.5073H344.252V2.01966H333.95V8.41977H337.995V5.30507H340.207V10.31H331.738V0.128418H346.464V15.3986H325.48Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip8_27_5679)">
            <path d="M369.237 15.3986V2.02117H352.675V13.5073H362.98V7.10971H358.934V10.2229H356.722V5.21796H365.192V15.3986H350.464V0.129419H371.449V13.5073H388.01V2.01966H377.707V8.41977H381.753V5.30507H383.965V10.31H375.496V0.128418H390.221V15.3986H369.237Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip9_27_5679)">
            <path d="M412.995 15.3986V2.02117H396.433V13.5073H406.738V7.10971H402.691V10.2229H400.48V5.21796H408.95V15.3986H394.221V0.129419H415.207V13.5073H431.768V2.01966H421.465V8.41977H425.51V5.30507H427.722V10.31H419.253V0.128418H433.979V15.3986H412.995Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip10_27_5679)">
            <path d="M456.745 15.3986V2.02117H440.183V13.5073H450.488V7.10971H446.441V10.2229H444.23V5.21796H452.7V15.3986H437.971V0.129419H458.957V13.5073H475.517V2.01966H465.215V8.41977H469.26V5.30507H471.472V10.31H463.003V0.128418H477.729V15.3986H456.745Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip11_27_5679)">
            <path d="M500.502 15.3986V2.02117H483.94V13.5073H494.245V7.10971H490.199V10.2229H487.987V5.21796H496.457V15.3986H481.729V0.129419H502.714V13.5073H519.275V2.01966H508.972V8.41977H513.017V5.30507H515.23V10.31H506.761V0.128418H521.486V15.3986H500.502Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip12_27_5679)">
            <path d="M544.26 15.3986V2.02117H527.698V13.5073H538.003V7.10971H533.956V10.2229H531.745V5.21796H540.215V15.3986H525.486V0.129419H546.472V13.5073H563.032V2.01966H552.73V8.41977H556.775V5.30507H558.987V10.31H550.518V0.128418H565.244V15.3986H544.26Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip13_27_5679)">
            <path d="M588.017 15.3986V2.02117H571.455V13.5073H581.76V7.10971H577.714V10.2229H575.502V5.21796H583.972V15.3986H569.244V0.129419H590.229V13.5073H606.79V2.01966H596.487V8.41977H600.533V5.30507H602.745V10.31H594.276V0.128418H609.001V15.3986H588.017Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip14_27_5679)">
            <path d="M631.775 15.3986V2.02117H615.213V13.5073H625.518V7.10971H621.471V10.2229H619.26V5.21796H627.73V15.3986H613.001V0.129419H633.987V13.5073H650.548V2.01966H640.245V8.41977H644.29V5.30507H646.502V10.31H638.033V0.128418H652.759V15.3986H631.775Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip15_27_5679)">
            <path d="M675.532 15.3986V2.02117H658.97V13.5073H669.276V7.10971H665.229V10.2229H663.018V5.21796H671.488V15.3986H656.759V0.129419H677.744V13.5073H694.305V2.01966H684.002V8.41977H688.048V5.30507H690.26V10.31H681.791V0.128418H696.517V15.3986H675.532Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip16_27_5679)">
            <path d="M719.29 15.3986V2.02117H702.728V13.5073H713.033V7.10971H708.987V10.2229H706.775V5.21796H715.245V15.3986H700.517V0.129419H721.502V13.5073H738.063V2.01966H727.76V8.41977H731.805V5.30507H734.017V10.31H725.549V0.128418H740.274V15.3986H719.29Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip17_27_5679)">
            <path d="M763.048 15.3986V2.02117H746.486V13.5073H756.791V7.10971H752.744V10.2229H750.533V5.21796H759.003V15.3986H744.274V0.129419H765.26V13.5073H781.82V2.01966H771.518V8.41977H775.563V5.30507H777.775V10.31H769.306V0.128418H784.032V15.3986H763.048Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip18_27_5679)">
            <path d="M806.805 15.3986V2.02117H790.243V13.5073H800.548V7.10971H796.502V10.2229H794.29V5.21796H802.76V15.3986H788.032V0.129419H809.017V13.5073H825.578V2.01966H815.275V8.41977H819.32V5.30507H821.533V10.31H813.064V0.128418H827.789V15.3986H806.805Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip19_27_5679)">
            <path d="M850.563 15.3986V2.02117H834.001V13.5073H844.306V7.10971H840.259V10.2229H838.048V5.21796H846.518V15.3986H831.789V0.129419H852.775V13.5073H869.335V2.01966H859.033V8.41977H863.078V5.30507H865.29V10.31H856.821V0.128418H871.547V15.3986H850.563Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip20_27_5679)">
            <path d="M894.32 15.3986V2.02117H877.758V13.5073H888.063V7.10971H884.017V10.2229H881.805V5.21796H890.275V15.3986H875.547V0.129419H896.532V13.5073H913.093V2.01966H902.79V8.41977H906.836V5.30507H909.048V10.31H900.579V0.128418H915.304V15.3986H894.32Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip21_27_5679)">
            <path d="M938.078 15.3986V2.02117H921.516V13.5073H931.821V7.10971H927.774V10.2229H925.563V5.21796H934.033V15.3986H919.304V0.129419H940.29V13.5073H956.851V2.01966H946.548V8.41977H950.593V5.30507H952.805V10.31H944.336V0.128418H959.062V15.3986H938.078Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip22_27_5679)">
            <path d="M981.835 15.3986V2.02117H965.273V13.5073H975.579V7.10971H971.532V10.2229H969.321V5.21796H977.791V15.3986H963.062V0.129419H984.047V13.5073H1000.61V2.01966H990.305V8.41977H994.351V5.30507H996.563V10.31H988.094V0.128418H1002.82V15.3986H981.835Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip23_27_5679)">
            <path d="M1025.59 15.3986V2.02117H1009.03V13.5073H1019.34V7.10971H1015.29V10.2229H1013.08V5.21796H1021.55V15.3986H1006.82V0.129419H1027.81V13.5073H1044.37V2.01966H1034.06V8.41977H1038.11V5.30507H1040.32V10.31H1031.85V0.128418H1046.58V15.3986H1025.59Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip24_27_5679)">
            <path d="M1069.35 15.3986V2.02117H1052.79V13.5073H1063.09V7.10971H1059.05V10.2229H1056.84V5.21796H1065.31V15.3986H1050.58V0.129419H1071.56V13.5073H1088.12V2.01966H1077.82V8.41977H1081.87V5.30507H1084.08V10.31H1075.61V0.128418H1090.33V15.3986H1069.35Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip25_27_5679)">
            <path d="M1113.11 15.3986V2.02117H1096.55V13.5073H1106.85V7.10971H1102.8V10.2229H1100.59V5.21796H1109.06V15.3986H1094.33V0.129419H1115.32V13.5073H1131.88V2.01966H1121.58V8.41977H1125.62V5.30507H1127.84V10.31H1119.37V0.128418H1134.09V15.3986H1113.11Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip26_27_5679)">
            <path d="M1156.87 15.3986V2.02117H1140.3V13.5073H1150.61V7.10971H1146.56V10.2229H1144.35V5.21796H1152.82V15.3986H1138.09V0.129419H1159.08V13.5073H1175.64V2.01966H1165.34V8.41977H1169.38V5.30507H1171.59V10.31H1163.12V0.128418H1177.85V15.3986H1156.87Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip27_27_5679)">
            <path d="M1200.62 15.3986V2.02117H1184.06V13.5073H1194.37V7.10971H1190.32V10.2229H1188.11V5.21796H1196.58V15.3986H1181.85V0.129419H1202.84V13.5073H1219.4V2.01966H1209.09V8.41977H1213.14V5.30507H1215.35V10.31H1206.88V0.128418H1221.61V15.3986H1200.62Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip28_27_5679)">
            <path d="M1244.38 15.3986V2.02117H1227.82V13.5073H1238.12V7.10971H1234.08V10.2229H1231.87V5.21796H1240.34V15.3986H1225.61V0.129419H1246.59V13.5073H1263.15V2.01966H1252.85V8.41977H1256.9V5.30507H1259.11V10.31H1250.64V0.128418H1265.37V15.3986H1244.38Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip29_27_5679)">
            <path d="M1288.14 15.3986V2.02117H1271.58V13.5073H1281.88V7.10971H1277.84V10.2229H1275.62V5.21796H1284.09V15.3986H1269.37V0.129419H1290.35V13.5073H1306.91V2.01966H1296.61V8.41977H1300.65V5.30507H1302.87V10.31H1294.4V0.128418H1309.12V15.3986H1288.14Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip30_27_5679)">
            <path d="M1331.9 15.3986V2.02117H1315.33V13.5073H1325.64V7.10971H1321.59V10.2229H1319.38V5.21796H1327.85V15.3986H1313.12V0.129419H1334.11V13.5073H1350.67V2.01966H1340.37V8.41977H1344.41V5.30507H1346.62V10.31H1338.15V0.128418H1352.88V15.3986H1331.9Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip31_27_5679)">
            <path d="M1375.65 15.3986V2.02117H1359.09V13.5073H1369.4V7.10971H1365.35V10.2229H1363.14V5.21796H1371.61V15.3986H1356.88V0.129419H1377.87V13.5073H1394.43V2.01966H1384.12V8.41977H1388.17V5.30507H1390.38V10.31H1381.91V0.128418H1396.64V15.3986H1375.65Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          
        </g>
        <defs>
          <clipPath id="clip0_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(0.395508 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip1_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(44.1531 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip2_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(87.9106 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip3_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(131.668 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip4_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(175.426 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip5_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(219.183 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip6_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(262.941 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip7_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(306.698 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip8_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(350.456 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip9_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(394.214 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip10_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(437.971 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip11_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(481.729 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip12_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(525.486 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip13_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(569.244 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip14_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(613.001 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip15_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(656.759 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip16_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(700.517 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip17_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(744.274 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip18_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(788.032 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip19_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(831.789 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip20_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(875.547 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip21_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(919.304 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip22_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(963.062 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip23_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1006.82 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip24_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1050.58 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip25_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1094.33 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip26_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1138.09 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip27_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1181.85 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip28_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1225.61 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip29_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1269.37 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip30_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1313.12 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip31_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1356.88 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
        </defs>
      </svg>
      </div>
      </div>
      {/* Top description */}
      <div className="text-center text-sm text-gray-200 px-4 py-4 border-b border-[#5a2a2a]">
        At Europa Pizza, we draw inspiration from the Mediterranean's rich history and
        flavors. Our name comes from the <strong>legend of Europa</strong>, the Tyrian
        princess, whisked away by Zeus in the form of a white bull. Europa’s journey
        across the sea symbolizes adventure, culture, and connection.
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src={Logo}
            alt="Europa Pizza Logo"
            width={90}
            height={90}
            className="mx-auto md:mx-0 mb-4"
          />
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-2 text-white">About</h3>
          <p className="text-gray-300 leading-relaxed">
            The Europa Pizza features a savory medley of flavors inspired by Europe’s
            diverse cuisine.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Contact</h3>
          <ul className="space-y-1 text-gray-300">
            <li>75 Dorcas St, South Melbourne, 3205</li>
            <li>
              <Phone className="inline h-4 w-4 mr-1 text-[#8B2635]" />
              1300 827 286
            </li>
            <li>
              <Mail className="inline h-4 w-4 mr-1 text-[#8B2635]" />
              info@europapizza.com.au
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Operating Hours</h3>
          <p className="text-gray-300">
            Monday: 7:00 AM – 3:00 PM <br />
            Tuesday–Sunday: 7:00 AM – 9:30 PM
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#5a2a2a] text-right text-gray-400 text-xs  px-6">
        © {new Date().getFullYear()} All Rights Reserved Europa Pizza
        <div className="w-screen relative left-1/2  -ml-[50vw] -mr-[50vw]">
        <svg width="1550" height="16" viewBox="0 0 1441 14"  fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.15">
          <g clip-path="url(#clip0_27_5679)">
            <path d="M19.1689 15.3983V2.02092H2.60696V13.5071H12.9121V7.10947H8.86553V10.2227H6.65407V5.21772H15.1241V15.3983H0.395508V0.129175H21.3809V13.5071H37.9416V2.01942H27.6389V8.41952H31.6842V5.30482H33.8963V10.3098H25.4274V0.128174H40.1531V15.3983H19.1689Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip1_27_5679)">
            <path d="M62.9264 15.3986V2.02117H46.3645V13.5073H56.6696V7.10971H52.6231V10.2229H50.4116V5.21796H58.8817V15.3986H44.1531V0.129419H65.1385V13.5073H81.6992V2.01966H71.3964V8.41977H75.4418V5.30507H77.6538V10.31H69.185V0.128418H83.9107V15.3986H62.9264Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip2_27_5679)">
            <path d="M106.692 15.3986V2.02117H90.1299V13.5073H100.435V7.10971H96.3885V10.2229H94.177V5.21796H102.647V15.3986H87.9185V0.129419H108.904V13.5073H125.465V2.01966H115.162V8.41977H119.207V5.30507H121.419V10.31H112.95V0.128418H127.676V15.3986H106.692Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip3_27_5679)">
            <path d="M150.449 15.3986V2.02117H133.887V13.5073H144.193V7.10971H140.146V10.2229H137.935V5.21796H146.405V15.3986H131.676V0.129419H152.661V13.5073H169.222V2.01966H158.919V8.41977H162.965V5.30507H165.177V10.31H156.708V0.128418H171.434V15.3986H150.449Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip4_27_5679)">
            <path d="M194.207 15.3986V2.02117H177.645V13.5073H187.95V7.10971H183.904V10.2229H181.692V5.21796H190.162V15.3986H175.434V0.129419H196.419V13.5073H212.98V2.01966H202.677V8.41977H206.722V5.30507H208.934V10.31H200.466V0.128418H215.191V15.3986H194.207Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip5_27_5679)">
            <path d="M237.965 15.3986V2.02117H221.403V13.5073H231.708V7.10971H227.661V10.2229H225.45V5.21796H233.92V15.3986H219.191V0.129419H240.177V13.5073H256.737V2.01966H246.435V8.41977H250.48V5.30507H252.692V10.31H244.223V0.128418H258.949V15.3986H237.965Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip6_27_5679)">
            <path d="M281.722 15.3986V2.02117H265.16V13.5073H275.465V7.10971H271.419V10.2229H269.207V5.21796H277.677V15.3986H262.949V0.129419H283.934V13.5073H300.495V2.01966H290.192V8.41977H294.237V5.30507H296.449V10.31H287.981V0.128418H302.706V15.3986H281.722Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip7_27_5679)">
            <path d="M325.48 15.3986V2.02117H308.918V13.5073H319.223V7.10971H315.176V10.2229H312.965V5.21796H321.435V15.3986H306.706V0.129419H327.692V13.5073H344.252V2.01966H333.95V8.41977H337.995V5.30507H340.207V10.31H331.738V0.128418H346.464V15.3986H325.48Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip8_27_5679)">
            <path d="M369.237 15.3986V2.02117H352.675V13.5073H362.98V7.10971H358.934V10.2229H356.722V5.21796H365.192V15.3986H350.464V0.129419H371.449V13.5073H388.01V2.01966H377.707V8.41977H381.753V5.30507H383.965V10.31H375.496V0.128418H390.221V15.3986H369.237Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip9_27_5679)">
            <path d="M412.995 15.3986V2.02117H396.433V13.5073H406.738V7.10971H402.691V10.2229H400.48V5.21796H408.95V15.3986H394.221V0.129419H415.207V13.5073H431.768V2.01966H421.465V8.41977H425.51V5.30507H427.722V10.31H419.253V0.128418H433.979V15.3986H412.995Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip10_27_5679)">
            <path d="M456.745 15.3986V2.02117H440.183V13.5073H450.488V7.10971H446.441V10.2229H444.23V5.21796H452.7V15.3986H437.971V0.129419H458.957V13.5073H475.517V2.01966H465.215V8.41977H469.26V5.30507H471.472V10.31H463.003V0.128418H477.729V15.3986H456.745Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip11_27_5679)">
            <path d="M500.502 15.3986V2.02117H483.94V13.5073H494.245V7.10971H490.199V10.2229H487.987V5.21796H496.457V15.3986H481.729V0.129419H502.714V13.5073H519.275V2.01966H508.972V8.41977H513.017V5.30507H515.23V10.31H506.761V0.128418H521.486V15.3986H500.502Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip12_27_5679)">
            <path d="M544.26 15.3986V2.02117H527.698V13.5073H538.003V7.10971H533.956V10.2229H531.745V5.21796H540.215V15.3986H525.486V0.129419H546.472V13.5073H563.032V2.01966H552.73V8.41977H556.775V5.30507H558.987V10.31H550.518V0.128418H565.244V15.3986H544.26Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip13_27_5679)">
            <path d="M588.017 15.3986V2.02117H571.455V13.5073H581.76V7.10971H577.714V10.2229H575.502V5.21796H583.972V15.3986H569.244V0.129419H590.229V13.5073H606.79V2.01966H596.487V8.41977H600.533V5.30507H602.745V10.31H594.276V0.128418H609.001V15.3986H588.017Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip14_27_5679)">
            <path d="M631.775 15.3986V2.02117H615.213V13.5073H625.518V7.10971H621.471V10.2229H619.26V5.21796H627.73V15.3986H613.001V0.129419H633.987V13.5073H650.548V2.01966H640.245V8.41977H644.29V5.30507H646.502V10.31H638.033V0.128418H652.759V15.3986H631.775Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip15_27_5679)">
            <path d="M675.532 15.3986V2.02117H658.97V13.5073H669.276V7.10971H665.229V10.2229H663.018V5.21796H671.488V15.3986H656.759V0.129419H677.744V13.5073H694.305V2.01966H684.002V8.41977H688.048V5.30507H690.26V10.31H681.791V0.128418H696.517V15.3986H675.532Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip16_27_5679)">
            <path d="M719.29 15.3986V2.02117H702.728V13.5073H713.033V7.10971H708.987V10.2229H706.775V5.21796H715.245V15.3986H700.517V0.129419H721.502V13.5073H738.063V2.01966H727.76V8.41977H731.805V5.30507H734.017V10.31H725.549V0.128418H740.274V15.3986H719.29Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip17_27_5679)">
            <path d="M763.048 15.3986V2.02117H746.486V13.5073H756.791V7.10971H752.744V10.2229H750.533V5.21796H759.003V15.3986H744.274V0.129419H765.26V13.5073H781.82V2.01966H771.518V8.41977H775.563V5.30507H777.775V10.31H769.306V0.128418H784.032V15.3986H763.048Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip18_27_5679)">
            <path d="M806.805 15.3986V2.02117H790.243V13.5073H800.548V7.10971H796.502V10.2229H794.29V5.21796H802.76V15.3986H788.032V0.129419H809.017V13.5073H825.578V2.01966H815.275V8.41977H819.32V5.30507H821.533V10.31H813.064V0.128418H827.789V15.3986H806.805Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip19_27_5679)">
            <path d="M850.563 15.3986V2.02117H834.001V13.5073H844.306V7.10971H840.259V10.2229H838.048V5.21796H846.518V15.3986H831.789V0.129419H852.775V13.5073H869.335V2.01966H859.033V8.41977H863.078V5.30507H865.29V10.31H856.821V0.128418H871.547V15.3986H850.563Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip20_27_5679)">
            <path d="M894.32 15.3986V2.02117H877.758V13.5073H888.063V7.10971H884.017V10.2229H881.805V5.21796H890.275V15.3986H875.547V0.129419H896.532V13.5073H913.093V2.01966H902.79V8.41977H906.836V5.30507H909.048V10.31H900.579V0.128418H915.304V15.3986H894.32Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip21_27_5679)">
            <path d="M938.078 15.3986V2.02117H921.516V13.5073H931.821V7.10971H927.774V10.2229H925.563V5.21796H934.033V15.3986H919.304V0.129419H940.29V13.5073H956.851V2.01966H946.548V8.41977H950.593V5.30507H952.805V10.31H944.336V0.128418H959.062V15.3986H938.078Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip22_27_5679)">
            <path d="M981.835 15.3986V2.02117H965.273V13.5073H975.579V7.10971H971.532V10.2229H969.321V5.21796H977.791V15.3986H963.062V0.129419H984.047V13.5073H1000.61V2.01966H990.305V8.41977H994.351V5.30507H996.563V10.31H988.094V0.128418H1002.82V15.3986H981.835Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip23_27_5679)">
            <path d="M1025.59 15.3986V2.02117H1009.03V13.5073H1019.34V7.10971H1015.29V10.2229H1013.08V5.21796H1021.55V15.3986H1006.82V0.129419H1027.81V13.5073H1044.37V2.01966H1034.06V8.41977H1038.11V5.30507H1040.32V10.31H1031.85V0.128418H1046.58V15.3986H1025.59Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip24_27_5679)">
            <path d="M1069.35 15.3986V2.02117H1052.79V13.5073H1063.09V7.10971H1059.05V10.2229H1056.84V5.21796H1065.31V15.3986H1050.58V0.129419H1071.56V13.5073H1088.12V2.01966H1077.82V8.41977H1081.87V5.30507H1084.08V10.31H1075.61V0.128418H1090.33V15.3986H1069.35Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip25_27_5679)">
            <path d="M1113.11 15.3986V2.02117H1096.55V13.5073H1106.85V7.10971H1102.8V10.2229H1100.59V5.21796H1109.06V15.3986H1094.33V0.129419H1115.32V13.5073H1131.88V2.01966H1121.58V8.41977H1125.62V5.30507H1127.84V10.31H1119.37V0.128418H1134.09V15.3986H1113.11Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip26_27_5679)">
            <path d="M1156.87 15.3986V2.02117H1140.3V13.5073H1150.61V7.10971H1146.56V10.2229H1144.35V5.21796H1152.82V15.3986H1138.09V0.129419H1159.08V13.5073H1175.64V2.01966H1165.34V8.41977H1169.38V5.30507H1171.59V10.31H1163.12V0.128418H1177.85V15.3986H1156.87Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip27_27_5679)">
            <path d="M1200.62 15.3986V2.02117H1184.06V13.5073H1194.37V7.10971H1190.32V10.2229H1188.11V5.21796H1196.58V15.3986H1181.85V0.129419H1202.84V13.5073H1219.4V2.01966H1209.09V8.41977H1213.14V5.30507H1215.35V10.31H1206.88V0.128418H1221.61V15.3986H1200.62Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip28_27_5679)">
            <path d="M1244.38 15.3986V2.02117H1227.82V13.5073H1238.12V7.10971H1234.08V10.2229H1231.87V5.21796H1240.34V15.3986H1225.61V0.129419H1246.59V13.5073H1263.15V2.01966H1252.85V8.41977H1256.9V5.30507H1259.11V10.31H1250.64V0.128418H1265.37V15.3986H1244.38Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip29_27_5679)">
            <path d="M1288.14 15.3986V2.02117H1271.58V13.5073H1281.88V7.10971H1277.84V10.2229H1275.62V5.21796H1284.09V15.3986H1269.37V0.129419H1290.35V13.5073H1306.91V2.01966H1296.61V8.41977H1300.65V5.30507H1302.87V10.31H1294.4V0.128418H1309.12V15.3986H1288.14Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip30_27_5679)">
            <path d="M1331.9 15.3986V2.02117H1315.33V13.5073H1325.64V7.10971H1321.59V10.2229H1319.38V5.21796H1327.85V15.3986H1313.12V0.129419H1334.11V13.5073H1350.67V2.01966H1340.37V8.41977H1344.41V5.30507H1346.62V10.31H1338.15V0.128418H1352.88V15.3986H1331.9Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip31_27_5679)">
            <path d="M1375.65 15.3986V2.02117H1359.09V13.5073H1369.4V7.10971H1365.35V10.2229H1363.14V5.21796H1371.61V15.3986H1356.88V0.129419H1377.87V13.5073H1394.43V2.01966H1384.12V8.41977H1388.17V5.30507H1390.38V10.31H1381.91V0.128418H1396.64V15.3986H1375.65Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          <g clip-path="url(#clip32_27_5679)">
            <path d="M1419.41 15.3986V2.02117H1402.85V13.5073H1413.15V7.10971H1409.11V10.2229H1406.9V5.21796H1415.37V15.3986H1400.64V0.129419H1421.62V13.5073H1438.18V2.01966H1427.88V8.41977H1431.93V5.30507H1434.14V10.31H1425.67V0.128418H1440.4V15.3986H1419.41Z" fill="#FFFAF4"></path>
          </g>
          
        </g>
        <defs>
          <clipPath id="clip0_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(0.395508 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip1_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(44.1531 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip2_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(87.9106 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip3_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(131.668 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip4_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(175.426 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip5_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(219.183 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip6_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(262.941 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip7_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(306.698 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip8_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(350.456 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip9_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(394.214 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip10_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(437.971 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip11_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(481.729 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip12_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(525.486 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip13_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(569.244 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip14_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(613.001 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip15_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(656.759 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip16_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(700.517 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip17_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(744.274 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip18_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(788.032 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip19_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(831.789 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip20_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(875.547 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip21_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(919.304 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip22_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(963.062 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip23_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1006.82 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip24_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1050.58 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip25_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1094.33 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip26_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1138.09 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip27_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1181.85 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip28_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1225.61 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip29_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1269.37 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip30_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1313.12 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip31_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1356.88 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
          <clipPath id="clip32_27_5679">
            <rect width="39.7576" height="15.2701" fill="white" transform="translate(1400.64 0.12793)"></rect>
          </clipPath>
        </defs>
      </svg>
      </div>
      </div>
    </footer>
  );
}
