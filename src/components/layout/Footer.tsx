export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-12 py-8 no-print">
      <div className="container px-4 text-center space-y-3">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Made by Bashar Hasan, MD</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>&copy; {currentYear} ThromboLens. All rights reserved.</p>
          <p className="mt-1">For educational purposes only.</p>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>Hematology Education Platform</span>
        </div>
      </div>
    </footer>
  );
}
