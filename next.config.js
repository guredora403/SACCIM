/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
/** @type {import('next').NextConfig} */
import { glob} from "glob"

const config = {
    transpilePackages: [
        '@adobe/react-spectrum',
        '@react-spectrum/*',
        '@spectrum-icons/*'
    ].flatMap((spec) =>
        glob.sync(`${spec}`, { cwd: 'node_modules/' })
    )
};

export default config;