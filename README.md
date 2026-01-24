# Ethereum Tip Jar UI

A modern, Web3-enabled tip jar application built with Next.js and Wagmi. This interface allows users to send tips on Ethereum network to a smaret contract, and only owner can withdraw.

## Features

- 🔗 **Multi-Network Support** - Switch between different blockchain networks
- 👛 **Wallet Integration** - Connect your Web3 wallet seamlessly
- 💰 **Tip Management** - View and manage your cryptocurrency tips
- 🎨 **Modern UI** - Built with shadcn/ui components for a polished experience
- ⚡ **Type-Safe** - Full TypeScript support for robust development
- 🌙 **Theme Support** - Light and dark mode themes

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS with PostCSS
- **Web3**: [Wagmi](https://wagmi.sh) for Ethereum interactions
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Package Manager**: pnpm
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 16+ 
- pnpm installed (`npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
components/        # React components
  - admin/        # Admin panel components
  - tip/          # Tip-related components
  - wallet/       # Wallet connection components
  - ui/           # Reusable UI components
app/              # Next.js app router pages
config/           # Configuration files
hooks/            # Custom React hooks
lib/              # Utility functions and constants
providers/        # Context providers and theme setup
public/           # Static assets
```

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Key Configuration Files

- `wagmi.config.ts` - Wagmi configuration for Web3
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui components configuration

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is open source and available under the MIT License.
