dist_path = docs/.vuepress/dist

scp_command = scp -r -P $(XIAOTUPO_SSH_PORT) ./* $(XIAOTUPO_HOST_USERNAME)@$(XIAOTUPO_IP):/home/$(XIAOTUPO_HOST_USERNAME)/www/webpage/rust
git_command = git add . && git commit -m "update"

default:
	@echo "ip:" $(XIAOTUPO_IP)
	@echo "port:" $(XIAOTUPO_SSH_PORT)
	@echo "username:" $(XIAOTUPO_HOST_USERNAME)

	rm -rf $(dist_path) && $(git_command) && pnpm docs:build

	
	cd $(dist_path) && $(scp_command)

s:
	pnpm docs:dev
