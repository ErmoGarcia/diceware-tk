module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
	// "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
	"project": "tsconfig.eslint.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    },
    "overrides": [
      {
        "files": ["tests/**/*.ts"],
	"env": {"jest": true, "node": true}
      }
    ]
}
