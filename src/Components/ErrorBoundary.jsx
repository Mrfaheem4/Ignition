import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="fixed inset-0 z-[70] bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Unable to load this experience</h1>
        <p className="text-white/60 max-w-sm">Check your connection and try again. The 3D viewer also requires a browser with WebGL support.</p>
        <button className="mt-8 bg-white text-black px-6 py-3 rounded" onClick={() => window.location.reload()}>Try again</button>
        <a className="mt-5 text-white/70 underline" href="/showroom">Back to collection</a>
      </div>
    );
  }
}
