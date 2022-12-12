import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/icon_twitter.svg";
import { ReactComponent as Reddit } from "../../assets/icons/icon_reddit.svg";
import { ReactComponent as Medium } from "../../assets/icons/icon_medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/icon_twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Telegram } from "../../assets/icons/icon_telegram.svg";


export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://t.me/starguru416" target="_blank">  
        <SvgIcon color="primary" viewBox="0 0 256 256" component={Twitter} />
      </Link>

      <Link href="https://t.me/starguru416" target="_blank">
        <SvgIcon color="primary" viewBox="0 0 256 256" component={Telegram} />
      </Link>

      <Link href="https://t.me/starguru416" target="_blank">
        <SvgIcon color="primary" viewBox="0 0 256 256" component={Reddit} />
      </Link>

      <Link href="https://t.me/starguru416" target="_blank">
        <SvgIcon color="primary" viewBox="0 0 256 256" component={Medium} />
      </Link>

    </div>
  );
}
