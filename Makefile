dist_path = docs/.vuepress/dist

scp_command = scp -r -P $(XIAOTUPO_SSH_PORT) ./* $(XIAOTUPO_HOST_USERNAME)@$(XIAOTUPO_IP):/home/$(XIAOTUPO_HOST_USERNAME)/www/webpage/rust


default:
	@echo "ip:" $(XIAOTUPO_IP)
	@echo "port:" $(XIAOTUPO_SSH_PORT)
	@echo "username:" $(XIAOTUPO_HOST_USERNAME)

	rm -rf $(dist_path) && pnpm docs:build

	git add . && git commit -m "update"

	cd $(dist_path) && $(scp_command)
