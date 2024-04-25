import Image from "next/image";
import styles from "./page.module.css";
import TableDemo from "./components/TableDemo";
function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          table-demo&nbsp;
          {/* <Code className={styles.code}>web</Code> */}
        </p>
      </div>
      <TableDemo />
      {/* <Button appName="web" className={styles.button}>
        Click me!
      </Button> */}
    </main>
  );
}
